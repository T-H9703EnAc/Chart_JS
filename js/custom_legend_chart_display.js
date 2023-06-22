/**
 * コンストラクタ
 */
function CustomLegendChartDisplay() {
  this.chart = null;
}

/**
 * JSを読み込み時に行う処理
 */
$(document).ready(function () {
  new CustomLegendChartDisplay().init();
});

/**
 * 最初に行う処理
 */
CustomLegendChartDisplay.prototype.init = function () {
  let panel = this;
  // 凡例を作成
  panel.createLegend();

  // 表示ボタンがクリックされたときの処理
  $("#displayBtn").click(function () {
    // チャートを表示
    panel.chartDisplay();

    // チェックボックスとチャートの可視性を同期
    $(".chartCheck").each(function () {
      // チェックボックスのvalueを取得
      const datasetId = $(this).val();
      // チェックボックスのチェック状態を取得
      const isChecked = $(this).is(":checked");
      panel.toggleChart(datasetId, isChecked);
    });
  });

  // チェックボックスの変更イベントにリスナーを追加
  $(document).on("change", ".chartCheck", function () {
    // チェックボックスのvalueを取得
    const datasetId = $(this).val();
    // チェックボックスのチェック状態を取得
    const isChecked = $(this).is(":checked");
    panel.toggleChart(datasetId, isChecked);
  });

  // 初回時はチェックボックスにチェックを入れる。
  $(".chartCheck").prop("checked", true);
};

/**
 * 凡例を作成
 */
CustomLegendChartDisplay.prototype.createLegend = function () {
  let legendArea = $(".legendArea ").empty();

  // ピカチュウの図鑑Noをチェックボックスのvalueとして設定する。
  let pokemonDexNumber = "0025";

  let legend = `<label><input type="checkbox" class="chartCheck" value="${pokemonDexNumber}">ピカチュウ</label>`;

  legendArea.append(legend);
};

/**
 * チャート表示処理
 */
CustomLegendChartDisplay.prototype.chartDisplay = function () {
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
CustomLegendChartDisplay.prototype.getChartProperty = function () {
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
CustomLegendChartDisplay.prototype.getChartData = function () {
  let chartData = {
    // x軸のラベル
    labels: ["HP", "こうげき", "ぼうぎょ", "すばやさ", "とくぼう", "とくこう"],
    datasets: [
      {
        id: "0025",
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
CustomLegendChartDisplay.prototype.getChartOptions = function () {
  let chartOptions = {
    plugins: {
      legend: {
        // 凡例の非表示
        display: false,
      },
    },
  };
  return chartOptions;
};

/**
 * チャートの表示・非表示を切り替える
 * @param {*} datasetId チェックボックスの値
 * @param {*} isVisible チェックボックスのON・OFF
 * @returns
 */
CustomLegendChartDisplay.prototype.toggleChart = function (
  datasetId,
  isVisible
) {
  if (!this.chart) {
    // 初期化されていないかnullやundefinedの場合
    return;
  }

  // datasetに設定したidとチェックボックスのvalueに一致するものを抜き出す
  const dataset = this.chart.data.datasets.find((ds) => ds.id === datasetId);

  if (dataset) {
    // 表示・非表示を切り替える
    dataset.hidden = !isVisible;
    // チャートを更新
    this.chart.update();
  }
};
