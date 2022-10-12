export default class GameMannger extends Laya.Script {
  /** @prop { name: lblCountDownValue, tips: 倒计时, type: Node, default: null } */
  /** @prop { name: lblScoreValue, tips: 得分, type: Node, default: null } */
  /** @prop { name: dialogGameOver, tips: 游戏结束, type: Node, default: null } */
  /** @prop { name: lblScoreCurrentValue, tips: 当前得分, type: Node, default: null } */
  /** @prop { name: lblScoreHightValue, tips: 历史最高, type: Node, default: null } */
  
  lblCountDownValue: Laya.Label
  lblScoreValue: Laya.Label
  dialogGameOver: Laya.Sprite
  lblScoreCurrentValue: Laya.Label
  lblScoreHightValue: Laya.Label
  constructor() {
    super()
    this.lblCountDownValue = null
    this.lblScoreValue = null
    this.lblScoreCurrentValue = null
  }

  
  btnPlayAgain: Laya.Node
  onAwake() {
    this.btnPlayAgain = this.dialogGameOver.getChildByName('btnPlayAgain')
    this.btnPlayAgain.on(Laya.Event.MOUSE_DOWN, this, this.gameStart)
  }

  onStart() {
    this.gameStart()
  }

  onDisable() {

  }

  onUpdate() {
    
  }

  isPlaying: boolean = false
  downCount: number = 100
  score: number = 0
  gameStart() {
    this.isPlaying = true
    this.dialogGameOver.visible = false
    this.score = 0
    this.downCount = 100
    Laya.timer.loop(100, this, this.gameStartTimer)
  }

  gameEnd() {
    this.dialogGameOver.visible = true
    this.lblScoreCurrentValue.text = String(this.score)
    this.isPlaying = false
    Laya.timer.clear(this, this.gameStartTimer)
  }
  
  gameStartTimer() {
    this.lblCountDownValue.text = String(--this.downCount)
    this.lblScoreValue.text = String(++this.score)
    if(this.downCount === 0) this.gameEnd()
  }
}
