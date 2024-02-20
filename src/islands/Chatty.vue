<script setup lang="ts">
import { addLog } from "@state/LogStore";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { createPrompt } from "@utils/prompts";
import type { PromptContentType, PromptResponse } from "src/types";
import { ref, watch } from "vue";

const queryClient = useQueryClient();

const API_URL =
  "https://automation.medayo.com/webhook/6b997217-ce45-40be-9388-9397f6cb5d0d";

const chosenPromptContentType = ref("song");

const contentTypes: PromptContentType[] = [
  {
    key: "song",
    text: "Song",
  },
  {
    key: "poem",
    text: "Poem",
  },
  {
    key: "film-plot",
    text: "Film plot",
  },
  {
    key: "book-idea",
    text: "Book idea",
  },
];

const sendPrompt = async (chosenContentType: PromptContentType["key"]) => {
  const prompt = createPrompt(chosenContentType);
  const url = API_URL + "?prompt=" + encodeURIComponent(prompt);
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json() as Promise<PromptResponse>;
};

const { isFetching, isError, data, error, refetch } = useQuery({
  queryKey: ["prompt", chosenPromptContentType.value],
  queryFn: () =>
    sendPrompt(chosenPromptContentType.value as PromptContentType["key"]),
  staleTime: 5 * 60 * 1000,
});

watch(chosenPromptContentType, () => {
  refetch();
});

const onPromptSelection = (newContentType: PromptContentType["key"]) => {
  queryClient.cancelQueries({
    queryKey: ["prompt", chosenPromptContentType.value],
  });

  chosenPromptContentType.value = newContentType;
};

watch(data, () => {
  addLog("New ChatGPT response received");
});
</script>

<template>
  <ul
    class="items-center w-full text-sm font-medium flex xs:flex-col border-b-2 border-black mb-6"
  >
    <li
      v-for="ct in contentTypes"
      :key="ct.key"
      class="flex-1 flex items-center md:ps-3"
    >
      <input
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-offset-gray-700 focus:ring-2"
        type="radio"
        name="content-type-chosen"
        :id="'content-type-' + ct.key"
        :value="ct.key"
        @change="() => onPromptSelection(ct.key)"
        :checked="ct.key === chosenPromptContentType"
      />
      <label
        :for="'content-type-' + ct.key"
        class="w-full py-3 ms-2 text-sm font-medium"
      >
        {{ ct.text }}
      </label>
    </li>
  </ul>

  <span v-if="isFetching">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <!-- We can assume by this point that `isSuccess === true` -->
  <p v-else class="whitespace-break-spaces">{{ data?.result }}</p>
</template>
