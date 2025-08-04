export const BilibiliPlayer = <template>
  <div class="iframe-container">
    <iframe
      src={{@data.src}}
      class="bilibili-iframe"
      allowfullscreen="true"
      frameborder="no"
    />
    <div class="iframe-title">
      <a href={{@data.url}}>{{@data.title}}</a>
    </div>
  </div>
</template>;
