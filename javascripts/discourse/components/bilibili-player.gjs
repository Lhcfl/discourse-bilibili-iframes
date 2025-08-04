export const BilibiliPlayer = <template>
  <div class="bilibili-container">
    <iframe
      src={{@data.src}}
      class="bilibili-iframe"
      allowfullscreen="true"
      frameborder="no"
    />
    <div class="bilibili-title">
      <a href={{@data.src}}>{{@data.title}}</a>
    </div>
  </div>
</template>;
