const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = "hello";

  _pomelo = null;
  host = "127.0.0.1";
  port = "5020";

  start() {
    // init logic
    this.label.string = this.text;
  }

  onConnect() {
    if (!this._pomelo) {
      this._pomelo = new cc.Pomelo();
      this._pomelo.init(
        {
          host: this.host,
          port: this.port,
          log: true,
        },
        () => {
          this._pomelo.on("onNotify", this.ff);
          this._pomelo.on("onKick", this.ff);
        }
      );
    }
  }

  onSend() {
    this._pomelo.request("Hello.Say", { Words: "kudoo" }, function (data) {
      console.log("==>", data);
    });
  }

  ff(data, func) {
    console.log("==>", data);
    func && func(data);
  }
}
