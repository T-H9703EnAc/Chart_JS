/**
 * コンストラクタ
 */
function SimpleChartDisplay() {
  this.chart = null;
}

/**
 * JSを読み込み時に行う処理
 */
$(document).ready(function () {
  new SimpleChartDisplay().init();
});

/**
 * 最初に行う処理
 */
SimpleChartDisplay.prototype.init = function () {
  let panel = this;
  $("#displayBtn").click(function () {
    panel.chartDisplay();
  });
};

/**
 * チャート表示処理
 */
SimpleChartDisplay.prototype.chartDisplay = function () {
  // 既存のチャートがあれば破棄
  if (this.chart) {
    this.chart.destroy();
  }
  // canvasから2D描画コンテキストを取得
  const ctx = $("#chart")[0].getContext("2d");
  // チャートを描画する。
  this.chart = new Chart(ctx, this.getChartProperty());
};

/**
 * チャートを描画するためのプロパティの取得
 * @returns チャート描画プロパティ
 */
SimpleChartDisplay.prototype.getChartProperty = function () {
  let chartProperty = {
    // グラフの種類(今回は棒グラフ)
    type: "bar",
    // データ
    data: this.getChartData(),
  };
  return chartProperty;
};

/**
 * チャートに表示するデータのプロパティを取得
 * @returns チャートデータ
 */
SimpleChartDisplay.prototype.getChartData = function () {
  let chartData = {
    // x軸のラベル
    labels: ["HP", "こうげき", "ぼうぎょ", "すばやさ", "とくぼう", "とくこう"],
    datasets: [
      {
        label: "ピカチュウ",
        // グラフのデータ
        data: [211, 146, 116, 194, 136, 149],
      },
    ],
  };
  return chartData;
};
