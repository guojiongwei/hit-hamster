/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import GameMannger from "./game/GameMannger"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=960;
    static height:number=640;
    static scaleMode:string="fixedauto";
    static screenMode:string="none";
    static alignV:string="middle";
    static alignH:string="center";
    static startScene:any="GameScene.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("game/GameMannger.ts",GameMannger);
    }
}
GameConfig.init();