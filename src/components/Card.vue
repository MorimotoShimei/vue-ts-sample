<template>
  <div class="card">{{ card.text }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Card } from "@/types";

@Component
export default class TaskCard extends Vue {
  @Prop({ type: Object, required: true })
  card!: Card;
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
