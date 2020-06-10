<template>
  <div class="list">
    {{ list.name }}
    <taskCard
      v-for="card in list.cards"
      :key="card.id"
      class="card"
      :card="card"
    />
    <input type="text" @change="addCard" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import TaskCard from "@/components/Card.vue";
import { List } from "@/types";

export interface AddCardEvent {
  listId: number;
  text: string;
}

@Component({
  components: {
    TaskCard
  }
})
export default class CardList extends Vue {
  @Prop({ type: Object, required: true })
  list!: List;

  @Emit()
  addCard(event: Event & { currentTarget: HTMLInputElement }): AddCardEvent {
    const text = event.currentTarget.value;
    event.currentTarget.value = "";

    return {
      listId: this.list.id,
      text
    };
  }
}
</script>

<style lang="scss" scoped>
.list {
  border: 1px solid #000000;
  > .card {
    margin: 1px;
  }
}
</style>
