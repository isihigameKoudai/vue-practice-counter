# Vue.js+Vuex 入門(Webpack環境で学ぼう編)

## 記事の趣旨について
新卒１年目からVue.js+Vuexで大規模検索システムのフロントエンド開発に関わらせてもらった経験もあり、Vue.jsやフロントエンド環境に関する情報を流していました。  
前回はHTMLベースでVue.jsの構文などをメインに学ぼうということで社内勉強会用コンテンツセットで作っていました。   
今回はCLIを使ったwebpack環境上で簡単なカウンターアプリを作りながら、Vue+Vuexワールドを体験してもらえたらと思い書きました。 ~~最近はReactに浮気気味ですが~~ Vue+Vuexは本当にSPAが作りやすいですし、学びやすいので学習することをお勧めします！

## コンポーネント指向について

コンポーネントとは、、、   
この答えはみなさんお分かりかもしれませんが、そうです！「部品」です！   
画面内でボタンやラベルなどあらゆるパーツを再利用可能な「部品」として、サイトやアプリケーションなどを構築していく一つの考え方です。様々なところで扱えるような想定をしているので、世界観の統一化や使い回しによる開発スピードの向上・品質の担保などに繋がります。Vue.jsだけでなくReact.jsもその流れを汲み取っているライブラリの一つです。
下記にコンポーネントの定義をまとめてみました。   

    ・最小完備の機能を持っていること
    ・機能とインターフェース（接合部分）が明確
    ・疎結合であること（他要素に対して低依存であること）
    ・再利用可能である(Vue.js公式から)


## Vue,Vuex,Vue-routerについて

### Vue.jsとは
Vue.jsとは、、、   
これも大丈夫そうですね！   
コンポーネント指向のjavascriptフレームワークです。主にView(描写)の部分を担当していて、親しみやすく・融通がきき・高性能です。また、プロジェクトの大きさに応じて組み込むことも出来るので、全てのアプリケーションをVueで作ることもできれば、一部分に組み込むことも出来ます。「The Progressive Javascript Framework」と公式がすげーいけてるフレームワークだぜ！とい言っているので、ものすごーくイケてるんですね。

### Vuexとは
Vue.js公式で提供しているエコシステムの一つで、アプリケーションの状態やロジックを管理しています。大きくざっっっっくり分けるとState,Mutations,Actionsの３つに別れています。

**State** ・・・アプリケーションの状態を司っていて、信頼出来る唯一の情報源（Single Of Truth）です。   
**Mutations** ・・・Stateを変更できる唯一の存在で、同期的であることを条件にメソッドのように振る舞うことができる。   
**Actions** ・・・こちらもメソッド的な存在ですがMutationsと違い、Stateが変更出来ない・非同期処理を含むことが出来ます。ここからMutationsを呼ぶことも出来ます。   

### Vue-Routerについて
こちらもVuex同様にVue.js公式のエコシステムの一つで、アプリケーション内のリソースに対してURLを割り当てる（ルーティングする）ライブラリです。SPA開発ではhtmlを一つしか返さないので、他のページコンポーネントには当然URLが割り当てられていません。そこで、そのページコンポーネントにURLをVue-Routerで割り当てることによって、URL指定でページを呼び出すことが出来ます。
   
ページコンポーネントを取り込み、Vue-Routerに乗せてexportするだけのシンプル構成です。
```js
import VueRouter from 'vue-router';
import Top from '../pages/top';
import About from '../pages/about';

const routes = [
  {
    path: '/',
    component: Top
  },
  {
    path: '/about',
    component: About
  },
];

export default new VueRouter({
  routes,
});
```

router-linkでリンク先を指定し、router-viewにそのリンクに応じたページコンポーネントがサクサクと表示してくれます。めっちゃ便利ですね！
```html
<div class="g-content">
	<h2 class="title">Welcome to Vue world</h2>
	<router-link to="/">Top</router-link>
	<router-link to="/about">About</router-link>
	<p>RouterView↓↓↓</p>
	<router-view></router-view>
</div>
```

## Vue-cliで動かそう
Vue.jsを動かすにはWebpack環境等を構築する必要があり時間がかかるところでもあります。そこでCLI(Command Line Interface)を使うことで、その手間をスキップして素早く開発を始めることができます。今回はvue-cliを使ってVueを動かして行きます。

vue-cliのインストール
```
npm install -g vue-cli
```

cliでプロジェクト作成
```
vue init webpack [name] 
```

ディレクトリに入る
```
cd [name]
```

開発サーバーで実行   
以下、コマンドを入力した後にブラウザでローカルホストにアクセスして、画面に表示されれば成功です。
```
npm run dev
```
   


## Vue.jsにおけるコンポーネント分けについて
Vue.jsはコンポーネント指向のフレームワークなので、それぞれのパーツを部品として分割して開発して行きます。   
基本的には以下の手順でコンポーネント化して行きます。

```
・コンポーネントファイルの作成
・ファイルのインポートと登録
・テンプレートに書く！
```

### コンポーネント（１枚岩）ファイルの作成

以下のディレクトリ構造でcomponentsディレクトリ内にCounterコンポーネントを生成します
```
├─src/
  ├─ assets/
  ├─ components/
  |  └─ Counter.vue
  ├ App.vue
  └─ index.js
```

Counter.vue
```vue
<template>
  <div>
    <p>counter</p>
    <input 
      @click="coutnUp()"
      type="button"
      value="+1"
    />
    <p>{{count}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    coutnUp() {
      this.count++;
    }
  }
}
</script>
```

### ファイルのインポートと部品の登録

App.vue   
import文でCounterコンポーネントを取り込み、template内でタグとして扱うだけの簡単作業です。
```js
<script>
import Counter from './components/Counter'
 
export default {
	name: 'App',
	components: {
		Counter,
	}
}

</script>
```

### テンプレートに書く

templateではimportとcomponents内での宣言をすればhtmlタグで扱うことができます。
この時点で`npm run dev`でローカルホストで確認し、ラベルとボタンが出ていれば成功です。   
ボタンを押して同時に数値がカウントされればOKです！
```html
<template>
	<div id="app">
		<counter/>
	</div>
</template>
```

## Vuexでstateの管理
先ほどCounter.vueのファイル内でdataを保持してカウントアップしていましたが、今度はこれをVuexでState管理して行きます。   
でも、State管理ってどうやるねん！って感じなのでざっくり以下のような手順で進めて行きます。

```
・Vuexのインストール
・Storeの作成
・Vuexの読み込み
・コンポーネントとの接続
```

### コンポーネント分け
まず、先ほどのCounterコンポーネント内で使っていたボタンとラベルをさらにコンポーネント化して行きます。こうすることで、どのページで使っても同じ振る舞いをする部品ができ、ある程度内部を気にせず使い回せるので後々の開発スピードなどを高めることが出来ます。以下の構造でファイルを作成します。

```
├─components/
  ├ Counter.vue
  ├ Btn.vue
  └─ Lbl.vue
```

Lbl.vue

```
<template>
	<p>{{count}}</p>
</template>

<script>
import {mapState} from 'vuex';

export default {
	computed: {
		...mapState(['count']),
	}
}
</script>
```

Btn.vue

```
<template>
	<input 
		type="button"
		value="+1"
		@click="countUp()"
	/>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
	methods: {
		...mapMutations(['countUp'])
	}	
}
</script>
```

Counter.vue   
最後にCunterコンポーネント内で先ほど作った部品を使うために、取り込みます
```
<template>
  <div>
    <p>counter</p>
    <btn />
    <lbl />
  </div>
</template>

<script>
import Btn from './Btn';
import Lbl from './Lbl';

export default {
  components: {
    Btn,
    Lbl 
  }
}
</script>
```

ここまでで、いったんコンポーネント分けは終わりです！   
ここからがVuex本番ですので、目を食いしばって行きましょ！

### Vuexのインストール
vuexをnpm(yarnでもOK)でインストールします

```
npm install -—save vuex
```
### Storeの作成
以下の構造で、VuexのStoreを生成させるためstoreディレクトリを作成したのち内部にindex.jsを作ります。

```
├─src/
  ├ assets/
  ├ components/
  └─ store/
     └─ index.js
```

store/index.js   
やることはとてもシンプルで、VuexをVueで扱えるようにする、state・mutations・actionsの生成、Storeのexportをすれば大丈夫です。実際の環境ではこれを元に大量のstateが並んでいたり、そもそもこれらをモジュールとしてファイルを分割して扱ったりします。ですが、これが基本的な形になるので覚えておいて置くと良きです。

```
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	count: 0
};

const mutations = {
	countUp(state,payload) {
		state.count += 1;
	}
};

const actions = {
	addNumber({commit},payload) {
		commit('countUp',payload);
	}
};

export default new Vuex.Store({
	state: state,
	mutations: mutations,
	actions: actions
});
```
### Vuexの読み込み

src/main.js   
大元のjsファイルにてVuex,StoreのimportとVueインスタンスへの登録をします。

```js
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import store from './store';

Vue.use(Vuex);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  store: store,
  components: { App },
  template: '<App/>'
})

```
### コンポーネントとの接続
最後に各コンポーネントでstateの参照やmutation(またはactions)を使えるようにします。   

Lbl.vue   
mapStateでそのコンポーネント内でstateの参照ができるようになります。これで、他のコンポーネントがそのstateを変更した際に即座に値が反映されるようになります。
```
<template>
	<p>{{count}}</p>
</template>

<script>
import {mapState} from 'vuex';

export default {
	computed: {
		...mapState(['count']),
	}
}
</script>
```

Btn.vue   
ここではmapMutationsでstore内のmutationsを扱えるようにします。mutationsはメソッドのように扱えるのでクリックイベントなどに着けて使用できます。また引数として値を渡すこともできます。
```
<template>
	<input 
		type="button"
		value="+1"
		@click="countUp()"
	/>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
	methods: {
		...mapMutations(['countUp'])
	}	
}
</script>
```

ここでまた`npm run dev`コマンドでサーバーを立ち上げて、ローカルホスト同じ画面が出れば成功です！   
これで、Vueのコンポーネント作成からVuexでのState管理ができるようになりましたね！

