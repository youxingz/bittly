module.exports = {
    moduleName : 'Mock',
    name : 'Name',
    nameDefault : 'Unnamed Mock',
    type : 'Type',
    operations : 'Operations',
    setting : 'Setting',
    stopConfirm : 'Mock is running, are you sure to stop it ?',
    start : 'Start',
    stop : 'Stop',
    mockDeleteConfirm : 'Are you sure to delete this mock ?',
    mockerSetting : 'Mocker Setting',
    dataSendSize : 'Send',
    dataReceiveSize : 'Receive',
    mockers : {
        serialport : require('../mockers/serialport/i18n/en.lang.js'),
        tcp : require('../mockers/tcp/i18n/en.lang.js'),
        udp : require('../mockers/udp/i18n/en.lang.js'),
    },
    status : {
        title : 'Status',
        columnName : 'Name',
        columnDefaultValue : 'Default Value',
        columnRuntimeValue : 'Runtime Value',
    },
    response : {
        match : {
            title : 'Match',
            columnStatus : 'Status',
            columnName : 'Name',
            columnMatch : 'Match',
            columnResponse : 'Response',
            regexEnable : 'Regex Pattern',
            matcherAll : 'All',
            matcherText : 'Text',
            matcherHex : 'Hex',
            matcherScript : 'Script',
            matcherJson : 'JSON',
            entryName : 'Match : {0}',
        },
        manual : {
            title : 'Manual',
            history : 'History',
            contentCanNotBeEmpty : 'Content can not be empty',
        },
        snippet : {
            title : 'Snippets',
            attrName : 'Name',
            attrContent : 'Content',
            loopSend : 'Loop',
        },
        inlineEditorText : {
            editorName : 'Text',
            fullTitle : 'Text Edit',
            placeholder : 'Text Content',
        },
        inlineEditorHex : {
            editorName : 'Hex',
            fullTitle : 'HEX Edit',
            placeholder : 'Hex Content',
        },
        inlineEditorForm : {
            editorName : 'Form',
            fullTitle : 'Form Edit',
            endianessBig : 'BE',
            endianessLittle : 'LE',
            empty : 'Empty',
            columnName : 'Name',
            columnType : 'Type',
            columnValue : 'Value',
            columnDesc : 'Desc',
        },
        inlineEditorScript : {
            editorName : 'Script',
        },
        inlineEditorRandom : {
            editorName : 'Random',
        },
    },
};