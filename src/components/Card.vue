<template>
  <div class="card">
    <div
      class="card-name"
      :contenteditable="contenteditable"
      @dblclick="onDoubleClick"
      @keypress.enter="onKeyPressEnter"
      @blur="onBlur"
    >
      <Cross @click="removeCard" />
      {{ card.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, PropSync } from "vue-property-decorator";
import Cross from "@/components/Cross.vue";
import { Card, List } from "@/types";

export interface RemoveCardEvent {
  listId: number;
  cardId: number;
}

@Component({
  components: {
    Cross
  }
})
export default class TaskCard extends Vue {
  @Prop({ type: Object, required: true })
  readonly card!: Card;

  @Prop({ type: Number, required: true })
  listId!: List["id"];

  @PropSync("cardText", { type: String, required: true })
  syncedCardText!: Card["text"];

  @Emit()
  removeCard(): RemoveCardEvent {
    return {
      listId: this.listId,
      cardId: this.card.id
    };
  }

  contenteditable = false;

  onDoubleClick(event: MouseEvent & { currentTarget: HTMLDivElement }): void {
    this.contenteditable = true;
    event.currentTarget.focus();
  }

  onKeyPressEnter(
    event: KeyboardEvent & { currentTarget: HTMLDivElement }
  ): void {
    event.currentTarget.blur();
  }

  onBlur(event: FocusEvent & { currentTarget: HTMLDivElement }): void {
    this.syncedCardText = event.currentTarget.innerText;
    this.contenteditable = false;
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #000000;
  &-name {
    position: relative;
    > .cross {
      right: 0;
    }
  }
}
</style>
