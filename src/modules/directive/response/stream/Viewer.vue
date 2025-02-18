<template>
  <div class="h-100 d-flex flex-dir-column mt-1">
    <!-- no entries -->
    <a-empty v-if="0 == entries.all.length" class="mt-5" :description="false" />

    <template v-else>
      <!-- toolbar -->
      <div class="p-1 bg-light rounded-top border">
        <a-select size="small" style="width:100px;" v-model="filter">
          <a-select-option value="all">{{$t('directive.response.stream.filterAll')}}</a-select-option>
          <a-select-option value="receive">{{$t('directive.response.stream.filterReceive')}}</a-select-option>
          <a-select-option value="send">{{$t('directive.response.stream.filterSend')}}</a-select-option>
        </a-select>
        <a-radio-group ref="radioMode" size="small" class="ml-1" v-model="mode"> 
          <a-radio-button value="text">TEXT</a-radio-button>
          <a-radio-button value="hex">HEX</a-radio-button>
        </a-radio-group>
        <a-button ref="btnClear" size="small" class="ml-1" @click="actionClear"><a-icon type="delete" /></a-button>
      </div>
    
      <!-- data container -->
      <div ref="messages-container" class="flex-grow content border-left border-right border-bottom rounded-bottom overflow-auto h-0">
        <virtual-list ref="virtualList"
          style="height: 100%; overflow-y: auto;"
          :keeps="20"
          :data-key="'key'"
          :data-sources="entries[filter]"
          :data-component="entryItem"
          :extra-props="{mode,directive}"
        />
      </div>
    </template>
  </div>
</template>
<script>
import VirtualList from 'vue-virtual-scroll-list'
import EntryItem from './EntryItem.vue'
export default {
    name : 'BlockResponseViewerStream',
    components: { 
        'virtual-list' : VirtualList,
    },
    props: {
        /**
         * @property {Buffer}
         */
        content : {}, 
        /**
         * @property {MdbDirective}
         */
        value : {},
    },
    data () {
        return {
            /**
             * instance of directive
             * @property {MdbDirective|null}
             */
            directive : null,
            /**
             * list of transition data
             * @property {Object<String:Array<Object>>}
             */
            entries : {all:[],receive:[],send:[]},
            /**
             * display data mode
             * @property {String}
             */
            mode : 'text',
            /**
             * message filter name
             * @property {String}
             */
            filter : 'all',
            /**
             * data entry item
             * @property {EntryItem}
             */
            entryItem : EntryItem,
        };
    },
    created() {
        this.initVModel();
    },
    methods : {
        /**
         * init v-model
         */
        initVModel() {
            this.directive = this.value;
        },

        /**
         * clear all entries
         */
        actionClear() {
            this.entries = {all:[],receive:[],send:[]};
        },

        /**
         * refresh response data to viewer
         * @param {Buffer} data
         */
        async newResponseData( data ) {
            let entry = {};
            entry.key = `entry_${this.entries.length}`;
            entry.dir = 'receive';
            entry.time = new Date();
            entry.data = data;
            this.entries.all.push(entry);
            this.entries.receive.push(entry);
            
            await this.$nextTick();
            this.$refs.virtualList.scrollToBottom();
        },

        /**
         * refresh response data to viewer
         * @param {Buffer} data
         */
        async newRequestData(data) {
            let entry = {};
            entry.key = `entry_${this.entries.length}`;
            entry.dir = 'send';
            entry.time = new Date();
            entry.data = data;
            this.entries.all.push(entry);
            this.entries.send.push(entry);
            
            await this.$nextTick();
            this.$refs.virtualList.scrollToBottom()
        },
    },

    /**
     * generate testcase expect content from response.
     * @param {MdbDirective} directive
     * @param {Buffer} response
     * @returns {String}
     */
    generateTestcaseExpectContentFromResponse( directive, response ) {
        return '';
    },
}
</script>