SpeechJammer.net for Raspberry Pi
========================

Raspberry Piをネット経由で動作するSpeechJammerにします。

ネットにつながったRaspberry Piと、USBオーディオI/O（マイク端子のついたもの）が必要です。
サーバとクライアントがあります。
クライアントはRaspberry Pi上で起動します。
サーバはRaspberry Pi上か、どこか別のマシン上で起動します。

npm install

でインストール。

node server

サーバを起動。

node app

でクライアントを起動。

settings.js

に、サーバのポート、サーバのアドレス等を記載します。

http://[path_to_server]:8886/control.html

にPCやスマートフォンのブラウザからアクセスすると、JammingをOn/Off, 一定時間（デフォルトでは5秒）Onにするボタンを備えた操作盤が出ます。

sudo node switch_led

で、物理ボタンによるスイッチ制御やLEDによる状態表示を行います（要ハードウェア）。配線はswitch_led.jsをご参照ください。

links:

SpeechJammer:

https://sites.google.com/site/qurihara/home/speechjammer

プロジェクトウェブサイト：

https://sites.google.com/site/qurihara/home/speechjammer/rpi
