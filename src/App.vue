<template>
  <div id="app">
    <template v-for="list in lists">
      <div class="list-container" :key="list.id">
        <cardList :list="list" @add-card="addCard" />
      </div>
    </template>
    <input type="text" @change="addList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import cardList from "@/components/List.vue";
import { List } from "@/types";
import { initialLists } from "@/initialData";
import { AddCardEvent } from "@/components/List.vue";

@Component({
  components: {
    cardList
  }
})
export default class App extends Vue {
  lists: List[] = initialLists();
  listCreatedCount = this.lists.length;
  cardCreatedCount = this.lists.flatMap(list => list.cards).length;

  addList(event: Event & { currentTarget: HTMLInputElement }): void {
    const newList = {
      id: this.listCreatedCount + 1,
      name: event.currentTarget.value,
      cards: []
    };

    this.lists.push(newList);
    event.currentTarget.value = "";
    this.listCreatedCount = this.lists.length;
  }

  addCard({ listId, text }: AddCardEvent): void {
    const list = this.lists.find(list => list.id === listId);
    if (list === undefined) {
      return;
    }

    const newCard = {
      id: this.cardCreatedCount + 1,
      text
    };
    list.cards.push(newCard);
    this.cardCreatedCount =  this.lists.flatMap(list => list.cards).length;
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  > .list {
    margin: 1px;
  }
}
</style>
