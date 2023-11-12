import React, { useEffect } from 'react';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Link from '@editorjs/link';
import Delimiter from '@editorjs/delimiter';
import CheckList from '@editorjs/checklist';
import { memo } from 'react';
import { useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodeTool from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import mathTex from 'editorjs-math';

import SimpleImage from '@editorjs/simple-image';
import editorjsCodeflask from '@calumk/editorjs-codeflask';
import CodeBox from '@bomdi/codebox';
// import CodeTool from '@rxpm/editor-js-code';
import RawEditor from '@editorjs/raw';
import Alert from 'editorjs-alert';
import ColorPlugin from 'editorjs-text-color-plugin';
import Underline from '@editorjs/underline';
import Hyperlink from 'editorjs-hyperlink';
import Undo from 'editorjs-undo';
import ChangeCase from 'editorjs-change-case';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import ImageTool from '@editorjs/image';
import Warning from '@editorjs/warning';
import Quote from '@editorjs/quote';
import './style.css';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    tunes: ['anyTuneName'],
  },
  checkList: CheckList,
  list: List,
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+O',
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: "Quote's author",
    },
  },
  warning: Warning,
  anyTuneName: {
    class: AlignmentTuneTool,
    config: {
      default: 'left',
      blocks: {
        header: 'center',
        list: 'right',
      },
    },
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
        byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      },
    },
  },
  delimiter: Delimiter,
  link: Link,
  Color: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections: [
        '#EC7878',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#0070FF',
        '#03A9F4',
        '#00BCD4',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFF',
      ],
      defaultColor: '#FF1300',
      type: 'text',
      customPicker: true, // add a button to allow selecting any colour
    },
  },
  Marker: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      defaultColor: '#FFBF00',
      type: 'marker',
      icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
    },
  },
  changeCase: ChangeCase,
  Underline: Underline,
  header: {
    class: Header,
    inlineToolbar: true,
  },

  hyperlink: {
    class: Hyperlink,
    consig: {
      icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
    },
  },
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+M',
  },
  alert: {
    class: Alert,
    inlineToolbar: true,
  },
  codeBox: RawEditor,
  math: {
    class: mathTex, // for CDN: window.MathTexe
  },
};

const EditorJs = ({ data, onChange, editorblock, readOnly }) => {
  const ref = useRef();
  console.log(data);
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    ref.current === null;

    const editor = new EditorJS({
      holder: editorblock,
      placeholder: 'Entery content here...',
      tools: { ...EDITOR_JS_TOOLS },
      data: data,
      readOnly: false,
      onReady: () => {
        ref.current = editor;
        new Undo({ editor });
      },
      shortcut: 'CMD+SHIFT+H',
      async onChange(api, event) {
        const data = await api.saver.save();
        console.log(data);
        onChange(data);
      },
    });

    //Add a return function to handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
        // ref?.current?.destroy();
        ref.current === null;
      }
    };
  }, [data]);

  return <div className='' id={editorblock} />;
};

export default memo(EditorJs);
