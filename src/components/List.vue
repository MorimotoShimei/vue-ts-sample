<template>
  <div class="list">
    <div
      class="list-name"
      :contenteditable="contenteditable"
      @dblclick="onDoubleClick"
      @keypress.enter="onKeyPressEnter"
      @blur="onBlur"
    >
      <Cross @click="removeList" class="cross" />
      {{ list.name }}
    </div>
    <taskCard
      v-for="card in list.cards"
      :key="card.id"
      class="card"
      :card="card"
      :cardText.sync="card.text"
      :listId="list.id"
      @remove-card="removeCard"
      draggable
      @dragstart.native.stop="onDragStart(card, $event)"
      @dragover.native="moveCard(card.id, $event)"
      @dragend.native="onDragEnd"
    />
    <input type="text" @change="addCard" class="card-input" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, PropSync } from "vue-property-decorator";
import TaskCard from "@/components/Card.vue";
import Cross from "@/components/Cross.vue";
import { List, Card } from "@/types";
import { RemoveCardEvent } from "@/components/Card.vue";
import { CardData } from "@/App.vue";

export interface AddCardEvent {
  listId: number;
  text: string;
}

export interface MoveCardEvent {
  listId: number;
  cardId: number;
  event: DragEvent & { currentTarget: HTMLDivElement };
}

@Component({
  components: {
    TaskCard,
    Cross
  }
})
export default class CardList extends Vue {
  @Prop({ type: Object, required: true })
  readonly list!: List;

  @PropSync("listName", { type: String, required: true })
  syncedListName!: List["name"];

  @PropSync("draggedCardData", { required: true })
  syncedDraggedCardData!: CardData | null;

  contenteditable = false;

  @Emit()
  addCard(event: Event & { currentTarget: HTMLInputElement }): AddCardEvent {
    const text = event.currentTarget.value;
    event.currentTarget.value = "";

    return {
      listId: this.list.id,
      text
    };
  }

  @Emit()
  removeCard(event: RemoveCardEvent): RemoveCardEvent {
    return event;
  }

  @Emit()
  removeList(): number {
    return this.list.id;
  }

  onDragStart(card: Card, event: DragEvent): void {
    if (event.dataTransfer == null) {
      return;
    }
    event.dataTransfer.setData("text/plain", "");

    this.syncedDraggedCardData = {
      listId: this.list.id,
      card
    };
  }

  onDragEnd(): void {
    this.syncedDraggedCardData = null;
  }

  @Emit()
  moveCard(
    cardId: number,
    event: DragEvent & { currentTarget: HTMLDivElement }
  ): MoveCardEvent {
    return {
      listId: this.list.id,
      cardId,
      event
    };
  }

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
    this.syncedListName = event.currentTarget.innerText;
    this.contenteditable = false;
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 160px;
  border: 1px solid #000000;
  &-name {
    position: relative;
    > .cross {
      right: 0;
    }
  }
  > .card {
    margin: 1px;
  }
  > .card-input {
    width: 100%;
  }
}
</style>
