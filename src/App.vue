<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
button[type="primary"],
button[type="primary"][size="mini"],
button[type="primary"]:hover,
button[type="primary"][size="mini"]:hover {
  background-color: $uni-color-primary;
}

button[type="primary"]:not([hover-class]):active {
  background-color: mix($uni-color-primary, #000);
}
</style>
