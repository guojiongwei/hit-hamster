(function () {
  'use strict';

  class GameMannger extends Laya.Script {
      constructor() {
          super();
          this.isPlaying = false;
          this.downCount = 100;
          this.score = 0;
          this.lblCountDownValue = null;
          this.lblScoreValue = null;
          this.lblScoreCurrentValue = null;
      }
      onAwake() {
          this.btnPlayAgain = this.dialogGameOver.getChildByName('btnPlayAgain');
          this.btnPlayAgain.on(Laya.Event.MOUSE_DOWN, this, this.gameStart);
      }
      onStart() {
          this.gameStart();
      }
      onDisable() {
      }
      onUpdate() {
      }
      gameStart() {
          this.isPlaying = true;
          this.dialogGameOver.visible = false;
          this.score = 0;
          this.downCount = 100;
          Laya.timer.loop(100, this, this.gameStartTimer);
      }
      gameEnd() {
          this.dialogGameOver.visible = true;
          this.lblScoreCurrentValue.text = String(this.score);
          this.isPlaying = false;
          Laya.timer.clear(this, this.gameStartTimer);
      }
      gameStartTimer() {
          this.lblCountDownValue.text = String(--this.downCount);
          this.lblScoreValue.text = String(++this.score);
          if (this.downCount === 0)
              this.gameEnd();
      }
  }

  class GameConfig {
      constructor() { }
      static init() {
          var reg = Laya.ClassUtils.regClass;
          reg("game/GameMannger.ts", GameMannger);
      }
  }
  GameConfig.width = 960;
  GameConfig.height = 640;
  GameConfig.scaleMode = "fixedauto";
  GameConfig.screenMode = "none";
  GameConfig.alignV = "middle";
  GameConfig.alignH = "center";
  GameConfig.startScene = "GameScene.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = false;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;
  GameConfig.init();

  class Main {
      constructor() {
          if (window["Laya3D"])
              Laya3D.init(GameConfig.width, GameConfig.height);
          else
              Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
          Laya["Physics"] && Laya["Physics"].enable();
          Laya["DebugPanel"] && Laya["DebugPanel"].enable();
          Laya.stage.scaleMode = GameConfig.scaleMode;
          Laya.stage.screenMode = GameConfig.screenMode;
          Laya.stage.alignV = GameConfig.alignV;
          Laya.stage.alignH = GameConfig.alignH;
          Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
          if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
              Laya.enableDebugPanel();
          if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
              Laya["PhysicsDebugDraw"].enable();
          if (GameConfig.stat)
              Laya.Stat.show();
          Laya.alertGlobalError(true);
          Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
      }
      onVersionLoaded() {
          Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
      }
      onConfigLoaded() {
          GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
      }
  }
  new Main();

}());
