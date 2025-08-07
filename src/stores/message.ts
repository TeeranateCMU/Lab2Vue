import type { MessageState } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useMessageStore = defineStore('message',  {
    state: () : MessageState => ({
        message: ''
    }),
    actions: {
        updateMessage(message: string): void {
        this.message = message
        },
        resetMessage(): void {
            this.message = ''
            }
    }
  })