/**
 * コンストラクタ
 */
function CustomTooltipChartDisplay() {
  this.chart = null;
}

/**
 * JSを読み込み時に行う処理
 */
$(document).ready(function () {
  new CustomTooltipChartDisplay().init();
});

/**
 * 最初に行う処理
 */
CustomTooltipChartDisplay.prototype.init = function () {
  const panel = this;
  $("#displayBtn").click(function () {
    panel.chartDisplay();
  });
};

/**
 * チャート表示処理
 */
CustomTooltipChartDisplay.prototype.chartDisplay = function () {
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
CustomTooltipChartDisplay.prototype.getChartProperty = function () {
  let chartProperty = {
    // グラフの種類(今回は棒グラフ)
    type: "bar",
    // データ
    data: this.getChartData(),
    // オプション
    options: this.getChartOptions(),
  };
  return chartProperty;
};

/**
 * チャートに表示するデータのプロパティを取得
 * @returns チャートデータ
 */
CustomTooltipChartDisplay.prototype.getChartData = function () {
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

/**
 * チャートをカスタマイズするプラグインを取得
 * @returns プラグインプロパティ
 */
CustomTooltipChartDisplay.prototype.getChartOptions = function () {
  let chartOptions = {
    plugins: {
      tooltip: {
        // デフォルトのツールチップを無効
        enabled: false,
        external: function (context) {
          // Tooltip Element
          const customTooltip = $("#customTooltip");

          // コンテキストからツールチップを取得
          const tooltip = context.tooltip;

          // ツールチップが表示されていない場合
          if (tooltip.opacity === 0) {
            customTooltip.css("display", "none");
            return;
          }

          // データポイントの情報を取得
          const dataPoints = tooltip.dataPoints;
          // X軸のラベル
          const label = dataPoints[0].label;
          // Y軸の値
          const value = dataPoints[0].formattedValue;

          // カスタムツールチップの内容を設定
          customTooltip.html(`<label>${label}：${value}</label>`);

          // カスタムツールチップの幅と高さを計算
          const tooltipWidth = customTooltip.outerWidth();
          const tooltipHeight = customTooltip.outerHeight();

          // カスタムツールチップの位置を調整して設定
          const left = tooltip.caretX - tooltipWidth / 2;
          const top = tooltip.caretY - tooltipHeight / 2;
          customTooltip.css("left", left + "px");
          customTooltip.css("top", top + "px");

          // カスタムツールチップを表示
          customTooltip.css("display", "block");
        },
      },
    },
  };
  return chartOptions;
};
