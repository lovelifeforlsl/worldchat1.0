<template>
  <div>
    <ul class="content">
      <li>
        <a-avatar
          shape="square"
          :size="56"
          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2717062052,3164034025&fm=26&gp=0.jpg"
        />
        <div class="message">
          <div class="name">203号拖拉机</div>
          <div>天天：你吃了没？</div>
        </div>
        <div class="lastsendtime">13:13</div>
      </li>
      <li>
        <a-avatar
          shape="square"
          :size="56"
          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2717062052,3164034025&fm=26&gp=0.jpg"
        />
        <div class="message">
          <div class="name">203号拖拉机</div>
          <div>天天：你吃了没？</div>
        </div>
        <div class="lastsendtime">13:13</div>
      </li>
      <li>
        <a-avatar
          shape="square"
          :size="56"
          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2717062052,3164034025&fm=26&gp=0.jpg"
        />
        <div class="message">
          <div class="name">203号拖拉机</div>
          <div>天天：你吃了没？</div>
        </div>
        <div class="lastsendtime">13:13</div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
* {
  text-align: left;
  color: white;
}
.fl {
  float: left;
}
.content {
  height: 100%;
  position: relative;

  li {
    width: 100%;
    padding: 15px 25px;
    border-bottom: 1px solid black;

    .message {
      display: inline-block;
      vertical-align: middle;
      font-size: 17px;
      margin-left: 15px;
      max-width: 165px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .lastsendtime {
      float: right;
      font-size: 16px;
    }
  }
}
</style>