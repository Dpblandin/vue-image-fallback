# vue-image-fallback

Vue directive for broken images

### Usage

```javascript
import Vue from 'vue';
import ImageFallback from 'vue-image-fallback';

Vue.use(ImageFallback);

```

### Example with string

```html
<img src="foo.png" v-image-fallback="url/to/fallback/image">

```

### Example with array

```html
<img src="foo.png" v-image-fallback="[fallback_image1, fallback_image2, etc]">

```

### Example with object
```vue
<template>
  <img src="foo.png" v-image-fallback="imageFallbackOptions">
</template>

<script>
  export default {
    data() {
      return {
        imageFallbackOptions: {
          images: [
            "image_1",
            "image_2",
            "etc",
          ],
          
          loading: "url/to/loader/image",
          onError: this.onError()
        }
      }
    },
    
    methods: {
      onError() {
        // do something here when all images failed to load
      }
    }
  }
</script>

```
