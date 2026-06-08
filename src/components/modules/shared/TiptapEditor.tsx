// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import { BubbleMenu } from "@tiptap/extension-bubble-menu";

// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import Placeholder from "@tiptap/extension-placeholder";
// import Typography from "@tiptap/extension-typography";
// import { Table } from "@tiptap/extension-table";
// import TableRow from "@tiptap/extension-table-row";
// import TableCell from "@tiptap/extension-table-cell";
// import TableHeader from "@tiptap/extension-table-header";
// import Highlight from "@tiptap/extension-highlight";
// import TaskList from "@tiptap/extension-task-list";
// import TaskItem from "@tiptap/extension-task-item";
// import { common, createLowlight } from "lowlight";
// import { useCallback, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   Bold,
//   Italic,
//   Underline as UnderlineIcon,
//   Strikethrough,
//   Code,
//   Code2,
//   Heading1,
//   Heading2,
//   Heading3,
//   List,
//   ListOrdered,
//   Quote,
//   Link as LinkIcon,
//   Image as ImageIcon,
//   Table as TableIcon,
//   Minus,
//   Undo,
//   Redo,
//   CheckSquare,
//   Highlighter,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   Eraser,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const lowlight = createLowlight(common);

// type Props = {
//   content: string;
//   onChange: (html: string) => void;
//   placeholder?: string;
// };

// type ToolbarButtonProps = {
//   onClick: () => void;
//   active?: boolean;
//   disabled?: boolean;
//   tooltip: string;
//   children: React.ReactNode;
// };

// type ToolbarItem = {
//   tooltip: string;
//   icon: React.ReactNode;
//   onClick: () => void;
//   active?: boolean;
//   disabled?: boolean;
// };

// function ToolbarButton({
//   onClick,
//   active = false,
//   disabled = false,
//   tooltip,
//   children,
// }: ToolbarButtonProps) {
//   return (
//     <Tooltip>
//       <TooltipTrigger asChild>
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           className={cn(
//             "h-8 w-8 shrink-0",
//             active && "bg-foreground/10 text-foreground",
//           )}
//           onClick={onClick}
//           disabled={disabled}
//         >
//           {children}
//         </Button>
//       </TooltipTrigger>

//       <TooltipContent side="bottom" className="text-xs">
//         {tooltip}
//       </TooltipContent>
//     </Tooltip>
//   );
// }

// // function ToolbarButton({
// //   onClick,
// //   active,
// //   disabled,
// //   tooltip,
// //   children,
// // }: ToolbarButtonProps) {
// //   return (
// //     <Tooltip>
// //       <TooltipTrigger asChild>
// //         <Button
// //           type="button"
// //           variant="ghost"
// //           size="icon"
// //           className={cn(
// //             "h-8 w-8 shrink-0",
// //             active && "bg-foreground/10 text-foreground",
// //           )}
// //           onClick={onClick}
// //           disabled={disabled}
// //         >
// //           {children}
// //         </Button>
// //       </TooltipTrigger>
// //       <TooltipContent side="bottom" className="text-xs">
// //         {tooltip}
// //       </TooltipContent>
// //     </Tooltip>
// //   );
// // }

// export default function TiptapEditor({
//   content,
//   onChange,
//   placeholder,
// }: Props) {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         codeBlock: false,
//         heading: { levels: [1, 2, 3, 4] },
//       }),
//       Underline,
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: {
//           class: "text-primary underline underline-offset-2 cursor-pointer",
//           rel: "noopener noreferrer",
//           target: "_blank",
//         },
//       }),
//       Image.configure({
//         HTMLAttributes: { class: "rounded-lg max-w-full my-4 mx-auto block" },
//       }),
//       CodeBlockLowlight.configure({
//         lowlight,
//         HTMLAttributes: {
//           class:
//             "rounded-lg bg-[#1e1e2e] text-[#cdd6f4] p-4 font-mono text-sm my-4 overflow-x-auto",
//           spellcheck: "false",
//         },
//       }),
//       Placeholder.configure({
//         placeholder: placeholder || "Start writing your blog post here...",
//         emptyEditorClass:
//           "before:content-[attr(data-placeholder)] before:text-muted-foreground before:float-left before:pointer-events-none before:h-0",
//       }),
//       Typography,
//       Table.configure({ resizable: true }),
//       TableRow,
//       TableCell,
//       TableHeader,
//       Highlight.configure({
//         multicolor: true,
//         HTMLAttributes: { class: "rounded px-0.5" },
//       }),
//       TaskList,
//       TaskItem.configure({ nested: true }),
//     ],
//     content,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//     editorProps: {
//       attributes: {
//         class:
//           "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4 [&_pre]:!bg-[#1e1e2e] [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:text-sm [&_code:not(pre_code)]:font-mono [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-muted [&_th]:font-semibold",
//       },
//     },
//   });

//   const addLink = useCallback(() => {
//     if (!editor) return;
//     const prev = editor.getAttributes("link").href;
//     const url = window.prompt("URL:", prev);
//     if (url === null) return;
//     if (url === "") {
//       editor.chain().focus().extendMarkRange("link").unsetLink().run();
//       return;
//     }
//     editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
//   }, [editor]);

//   const addImage = useCallback(
//     (url: string) => {
//       if (!editor || !url) return;
//       editor.chain().focus().setImage({ src: url }).run();
//     },
//     [editor],
//   );

//   const addImageFromUrl = useCallback(() => {
//     const url = window.prompt("Image URL:");
//     if (url) addImage(url);
//   }, [addImage]);

//   const insertTable = useCallback(() => {
//     if (!editor) return;
//     editor
//       .chain()
//       .focus()
//       .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
//       .run();
//   }, [editor]);

//   if (!editor) return null;

//   // const toolbarGroups = [
//   //   // History
//   //   [
//   //     {
//   //       tooltip: "Undo (Ctrl+Z)",
//   //       icon: <Undo className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().undo().run(),
//   //       disabled: !editor.can().undo(),
//   //     },
//   //     {
//   //       tooltip: "Redo (Ctrl+Shift+Z)",
//   //       icon: <Redo className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().redo().run(),
//   //       disabled: !editor.can().redo(),
//   //     },
//   //   ],
//   //   // Headings
//   //   [
//   //     {
//   //       tooltip: "Heading 1",
//   //       icon: <Heading1 className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
//   //       active: editor.isActive("heading", { level: 1 }),
//   //     },
//   //     {
//   //       tooltip: "Heading 2",
//   //       icon: <Heading2 className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
//   //       active: editor.isActive("heading", { level: 2 }),
//   //     },
//   //     {
//   //       tooltip: "Heading 3",
//   //       icon: <Heading3 className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
//   //       active: editor.isActive("heading", { level: 3 }),
//   //     },
//   //   ],
//   //   // Inline formatting
//   //   [
//   //     {
//   //       tooltip: "Bold (Ctrl+B)",
//   //       icon: <Bold className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleBold().run(),
//   //       active: editor.isActive("bold"),
//   //     },
//   //     {
//   //       tooltip: "Italic (Ctrl+I)",
//   //       icon: <Italic className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleItalic().run(),
//   //       active: editor.isActive("italic"),
//   //     },
//   //     {
//   //       tooltip: "Underline (Ctrl+U)",
//   //       icon: <UnderlineIcon className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleUnderline().run(),
//   //       active: editor.isActive("underline"),
//   //     },
//   //     {
//   //       tooltip: "Strikethrough",
//   //       icon: <Strikethrough className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleStrike().run(),
//   //       active: editor.isActive("strike"),
//   //     },
//   //     {
//   //       tooltip: "Inline Code",
//   //       icon: <Code className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleCode().run(),
//   //       active: editor.isActive("code"),
//   //     },
//   //     {
//   //       tooltip: "Highlight",
//   //       icon: <Highlighter className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleHighlight().run(),
//   //       active: editor.isActive("highlight"),
//   //     },
//   //   ],
//   //   // Blocks
//   //   [
//   //     {
//   //       tooltip: "Code Block",
//   //       icon: <Code2 className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleCodeBlock().run(),
//   //       active: editor.isActive("codeBlock"),
//   //     },
//   //     {
//   //       tooltip: "Blockquote",
//   //       icon: <Quote className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleBlockquote().run(),
//   //       active: editor.isActive("blockquote"),
//   //     },
//   //     {
//   //       tooltip: "Bullet List",
//   //       icon: <List className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleBulletList().run(),
//   //       active: editor.isActive("bulletList"),
//   //     },
//   //     {
//   //       tooltip: "Ordered List",
//   //       icon: <ListOrdered className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleOrderedList().run(),
//   //       active: editor.isActive("orderedList"),
//   //     },
//   //     {
//   //       tooltip: "Task List",
//   //       icon: <CheckSquare className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().toggleTaskList().run(),
//   //       active: editor.isActive("taskList"),
//   //     },
//   //   ],
//   //   // Insert
//   //   [
//   //     {
//   //       tooltip: "Add Link",
//   //       icon: <LinkIcon className="h-4 w-4" />,
//   //       onClick: addLink,
//   //       active: editor.isActive("link"),
//   //     },
//   //     {
//   //       tooltip: "Insert Image from URL",
//   //       icon: <ImageIcon className="h-4 w-4" />,
//   //       onClick: addImageFromUrl,
//   //       active: false,
//   //     },
//   //     {
//   //       tooltip: "Insert Table (3×3)",
//   //       icon: <TableIcon className="h-4 w-4" />,
//   //       onClick: insertTable,
//   //       active: editor.isActive("table"),
//   //     },
//   //     {
//   //       tooltip: "Horizontal Rule",
//   //       icon: <Minus className="h-4 w-4" />,
//   //       onClick: () => editor.chain().focus().setHorizontalRule().run(),
//   //       active: false,
//   //     },
//   //   ],
//   //   // Clear
//   //   [
//   //     {
//   //       tooltip: "Clear Formatting",
//   //       icon: <Eraser className="h-4 w-4" />,
//   //       onClick: () =>
//   //         editor.chain().focus().clearNodes().unsetAllMarks().run(),
//   //       active: false,
//   //     },
//   //   ],
//   // ];

//   const toolbarGroups: ToolbarItem[][] = [
//     // History
//     [
//       {
//         tooltip: "Undo (Ctrl+Z)",
//         icon: <Undo className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().undo().run();
//         },
//         disabled: !editor.can().undo(),
//       },
//       {
//         tooltip: "Redo (Ctrl+Shift+Z)",
//         icon: <Redo className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().redo().run();
//         },
//         disabled: !editor.can().redo(),
//       },
//     ],

//     // Headings
//     [
//       {
//         tooltip: "Heading 1",
//         icon: <Heading1 className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleHeading({ level: 1 }).run();
//         },
//         active: editor.isActive("heading", { level: 1 }),
//       },
//       {
//         tooltip: "Heading 2",
//         icon: <Heading2 className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleHeading({ level: 2 }).run();
//         },
//         active: editor.isActive("heading", { level: 2 }),
//       },
//       {
//         tooltip: "Heading 3",
//         icon: <Heading3 className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleHeading({ level: 3 }).run();
//         },
//         active: editor.isActive("heading", { level: 3 }),
//       },
//     ],

//     // Inline formatting
//     [
//       {
//         tooltip: "Bold (Ctrl+B)",
//         icon: <Bold className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleBold().run();
//         },
//         active: editor.isActive("bold"),
//       },
//       {
//         tooltip: "Italic (Ctrl+I)",
//         icon: <Italic className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleItalic().run();
//         },
//         active: editor.isActive("italic"),
//       },
//       {
//         tooltip: "Underline (Ctrl+U)",
//         icon: <UnderlineIcon className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleUnderline().run();
//         },
//         active: editor.isActive("underline"),
//       },
//       {
//         tooltip: "Strikethrough",
//         icon: <Strikethrough className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleStrike().run();
//         },
//         active: editor.isActive("strike"),
//       },
//       {
//         tooltip: "Inline Code",
//         icon: <Code className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleCode().run();
//         },
//         active: editor.isActive("code"),
//       },
//       {
//         tooltip: "Highlight",
//         icon: <Highlighter className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleHighlight().run();
//         },
//         active: editor.isActive("highlight"),
//       },
//     ],

//     // Blocks
//     [
//       {
//         tooltip: "Code Block",
//         icon: <Code2 className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleCodeBlock().run();
//         },
//         active: editor.isActive("codeBlock"),
//       },
//       {
//         tooltip: "Blockquote",
//         icon: <Quote className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleBlockquote().run();
//         },
//         active: editor.isActive("blockquote"),
//       },
//       {
//         tooltip: "Bullet List",
//         icon: <List className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleBulletList().run();
//         },
//         active: editor.isActive("bulletList"),
//       },
//       {
//         tooltip: "Ordered List",
//         icon: <ListOrdered className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleOrderedList().run();
//         },
//         active: editor.isActive("orderedList"),
//       },
//       {
//         tooltip: "Task List",
//         icon: <CheckSquare className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().toggleTaskList().run();
//         },
//         active: editor.isActive("taskList"),
//       },
//     ],

//     // Insert
//     [
//       {
//         tooltip: "Add Link",
//         icon: <LinkIcon className="h-4 w-4" />,
//         onClick: addLink,
//         active: editor.isActive("link"),
//       },
//       {
//         tooltip: "Insert Image from URL",
//         icon: <ImageIcon className="h-4 w-4" />,
//         onClick: addImageFromUrl,
//         active: false,
//       },
//       {
//         tooltip: "Insert Table (3×3)",
//         icon: <TableIcon className="h-4 w-4" />,
//         onClick: insertTable,
//         active: editor.isActive("table"),
//       },
//       {
//         tooltip: "Horizontal Rule",
//         icon: <Minus className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().setHorizontalRule().run();
//         },
//         active: false,
//       },
//     ],

//     // Clear
//     [
//       {
//         tooltip: "Clear Formatting",
//         icon: <Eraser className="h-4 w-4" />,
//         onClick: () => {
//           editor.chain().focus().clearNodes().unsetAllMarks().run();
//         },
//         active: false,
//       },
//     ],
//   ];

//   return (
//     <TooltipProvider delayDuration={200}>
//       <div className="border rounded-lg overflow-hidden bg-background">
//         {/* Toolbar */}
//         <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/30 overflow-x-auto">
//           {toolbarGroups.map((group, gi) => (
//             <div key={gi} className="flex items-center">
//               {gi > 0 && (
//                 <Separator orientation="vertical" className="mx-1 h-5" />
//               )}
//               {group.map((btn, bi) => (
//                 <ToolbarButton
//                   key={bi}
//                   tooltip={btn.tooltip}
//                   onClick={btn.onClick}
//                   active={btn.active}
//                   disabled={btn.disabled}
//                 >
//                   {btn.icon}
//                 </ToolbarButton>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* Bubble Menu (selection toolbar) */}
//         {editor && (
//           <BubbleMenu
//             editor={editor}
//             tippyOptions={{ duration: 100 }}
//             className="flex items-center gap-0.5 bg-popover border shadow-lg rounded-lg p-1"
//           >
//             <ToolbarButton
//               tooltip="Bold"
//               onClick={() => editor.chain().focus().toggleBold().run()}
//               active={editor.isActive("bold")}
//             >
//               <Bold className="h-3.5 w-3.5" />
//             </ToolbarButton>
//             <ToolbarButton
//               tooltip="Italic"
//               onClick={() => editor.chain().focus().toggleItalic().run()}
//               active={editor.isActive("italic")}
//             >
//               <Italic className="h-3.5 w-3.5" />
//             </ToolbarButton>
//             <ToolbarButton
//               tooltip="Code"
//               onClick={() => editor.chain().focus().toggleCode().run()}
//               active={editor.isActive("code")}
//             >
//               <Code className="h-3.5 w-3.5" />
//             </ToolbarButton>
//             <ToolbarButton
//               tooltip="Link"
//               onClick={addLink}
//               active={editor.isActive("link")}
//             >
//               <LinkIcon className="h-3.5 w-3.5" />
//             </ToolbarButton>
//             <ToolbarButton
//               tooltip="Highlight"
//               onClick={() => editor.chain().focus().toggleHighlight().run()}
//               active={editor.isActive("highlight")}
//             >
//               <Highlighter className="h-3.5 w-3.5" />
//             </ToolbarButton>
//           </BubbleMenu>
//         )}

//         {/* Editor Area */}
//         <EditorContent editor={editor} className="min-h-[400px]" />

//         {/* Footer: word & char count */}
//         <div className="px-4 py-1.5 border-t bg-muted/20 flex items-center justify-between">
//           <p className="text-xs text-muted-foreground">
//             Tip: Press{" "}
//             <kbd className="px-1 py-0.5 rounded bg-muted text-xs font-mono">
//               ```
//             </kbd>{" "}
//             then Enter to insert a code block
//           </p>
//           <p className="text-xs text-muted-foreground">
//             {editor.storage.characterCount?.words?.() ?? 0} words
//           </p>
//         </div>
//       </div>
//     </TooltipProvider>
//   );
// }

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { common, createLowlight } from "lowlight";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  Undo,
  Redo,
  CheckSquare,
  Highlighter,
  Eraser,
} from "lucide-react";
import { cn } from "@/lib/utils";

const lowlight = createLowlight(common);

type Props = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  tooltip: string;
  children: React.ReactNode;
};

type ToolbarItem = {
  tooltip: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
};

function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  tooltip,
  children,
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 shrink-0",
            active && "bg-foreground/10 text-foreground",
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

// ── BubbleMenu via BubbleMenuPlugin + createPortal ────────
// v3 approach: render a div into document.body via portal,
// pass its ref to BubbleMenuPlugin which controls visibility.

type BubbleMenuPortalProps = {
  editor: ReturnType<typeof useEditor>;
  addLink: () => void;
};

function BubbleMenuPortal({ editor, addLink }: BubbleMenuPortalProps) {
  // useRef — no setState, no cascading renders
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!editor || !menuRef.current) return;

    // BubbleMenuPlugin uses floating-ui in v3 (no tippyOptions)
    const plugin = BubbleMenuPlugin({
      pluginKey: "bubbleMenuReact",
      editor,
      element: menuRef.current,
      // options: floating-ui placement config
      options: {
        placement: "top",
        offset: 8,
      },
      shouldShow: ({ state }) => !state.selection.empty,
    });

    editor.registerPlugin(plugin);
    return () => {
      editor.unregisterPlugin("bubbleMenuReact");
    };
    // editor instance is stable — only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  return createPortal(
    // BubbleMenuPlugin controls this element's display via floating-ui.
    // Initial visibility:hidden prevents flash before plugin attaches.
    <div
      ref={menuRef}
      style={{ visibility: "hidden" }}
      className="flex items-center gap-0.5 bg-popover border shadow-lg rounded-lg p-1 z-50"
    >
      <ToolbarButton
        tooltip="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Bold className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Italic className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      >
        <UnderlineIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
      >
        <Code className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Link"
        onClick={addLink}
        active={editor.isActive("link")}
      >
        <LinkIcon className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Highlight"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        active={editor.isActive("highlight")}
      >
        <Highlighter className="h-3.5 w-3.5" />
      </ToolbarButton>
    </div>,
    document.body,
  );
}

// ── Main Editor ───────────────────────────────────────────

export default function TiptapEditor({
  content,
  onChange,
  placeholder,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2 cursor-pointer",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full my-4 mx-auto block" },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class:
            "rounded-lg bg-[#1e1e2e] text-[#cdd6f4] p-4 font-mono text-sm my-4 overflow-x-auto",
          spellcheck: "false",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing your blog post here...",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-muted-foreground before:float-left before:pointer-events-none before:h-0",
      }),
      Typography,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: "rounded px-0.5" },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4 [&_pre]:!bg-[#1e1e2e] [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded [&_code:not(pre_code)]:text-sm [&_code:not(pre_code)]:font-mono [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-muted [&_th]:font-semibold",
      },
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("URL:", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImageFromUrl = useCallback(() => {
    const url = window.prompt("Image URL:");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const insertTable = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  if (!editor) return null;

  const toolbarGroups: ToolbarItem[][] = [
    [
      {
        tooltip: "Undo (Ctrl+Z)",
        icon: <Undo className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().undo().run();
        },
        disabled: !editor.can().undo(),
      },
      {
        tooltip: "Redo (Ctrl+Shift+Z)",
        icon: <Redo className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().redo().run();
        },
        disabled: !editor.can().redo(),
      },
    ],
    [
      {
        tooltip: "Heading 1",
        icon: <Heading1 className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        },
        active: editor.isActive("heading", { level: 1 }),
      },
      {
        tooltip: "Heading 2",
        icon: <Heading2 className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        },
        active: editor.isActive("heading", { level: 2 }),
      },
      {
        tooltip: "Heading 3",
        icon: <Heading3 className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        },
        active: editor.isActive("heading", { level: 3 }),
      },
    ],
    [
      {
        tooltip: "Bold (Ctrl+B)",
        icon: <Bold className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleBold().run();
        },
        active: editor.isActive("bold"),
      },
      {
        tooltip: "Italic (Ctrl+I)",
        icon: <Italic className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleItalic().run();
        },
        active: editor.isActive("italic"),
      },
      {
        tooltip: "Underline (Ctrl+U)",
        icon: <UnderlineIcon className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleUnderline().run();
        },
        active: editor.isActive("underline"),
      },
      {
        tooltip: "Strikethrough",
        icon: <Strikethrough className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleStrike().run();
        },
        active: editor.isActive("strike"),
      },
      {
        tooltip: "Inline Code",
        icon: <Code className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleCode().run();
        },
        active: editor.isActive("code"),
      },
      {
        tooltip: "Highlight",
        icon: <Highlighter className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleHighlight().run();
        },
        active: editor.isActive("highlight"),
      },
    ],
    [
      {
        tooltip: "Code Block",
        icon: <Code2 className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleCodeBlock().run();
        },
        active: editor.isActive("codeBlock"),
      },
      {
        tooltip: "Blockquote",
        icon: <Quote className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleBlockquote().run();
        },
        active: editor.isActive("blockquote"),
      },
      {
        tooltip: "Bullet List",
        icon: <List className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleBulletList().run();
        },
        active: editor.isActive("bulletList"),
      },
      {
        tooltip: "Ordered List",
        icon: <ListOrdered className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleOrderedList().run();
        },
        active: editor.isActive("orderedList"),
      },
      {
        tooltip: "Task List",
        icon: <CheckSquare className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().toggleTaskList().run();
        },
        active: editor.isActive("taskList"),
      },
    ],
    [
      {
        tooltip: "Add Link",
        icon: <LinkIcon className="h-4 w-4" />,
        onClick: addLink,
        active: editor.isActive("link"),
      },
      {
        tooltip: "Insert Image from URL",
        icon: <ImageIcon className="h-4 w-4" />,
        onClick: addImageFromUrl,
        active: false,
      },
      {
        tooltip: "Insert Table (3×3)",
        icon: <TableIcon className="h-4 w-4" />,
        onClick: insertTable,
        active: editor.isActive("table"),
      },
      {
        tooltip: "Horizontal Rule",
        icon: <Minus className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().setHorizontalRule().run();
        },
        active: false,
      },
    ],
    [
      {
        tooltip: "Clear Formatting",
        icon: <Eraser className="h-4 w-4" />,
        onClick: () => {
          editor.chain().focus().clearNodes().unsetAllMarks().run();
        },
        active: false,
      },
    ],
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <div className="border rounded-lg overflow-hidden bg-background">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/30 overflow-x-auto">
          {toolbarGroups.map((group, gi) => (
            <div key={gi} className="flex items-center">
              {gi > 0 && (
                <Separator orientation="vertical" className="mx-1 h-5" />
              )}
              {group.map((btn, bi) => (
                <ToolbarButton
                  key={bi}
                  tooltip={btn.tooltip}
                  onClick={btn.onClick}
                  active={btn.active}
                  disabled={btn.disabled}
                >
                  {btn.icon}
                </ToolbarButton>
              ))}
            </div>
          ))}
        </div>

        {/* BubbleMenu — portal into document.body, plugin controls visibility */}
        <BubbleMenuPortal editor={editor} addLink={addLink} />

        {/* Editor Area */}
        <EditorContent editor={editor} className="min-h-[400px]" />

        {/* Footer */}
        <div className="px-4 py-1.5 border-t bg-muted/20 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Tip: Press{" "}
            <kbd className="px-1 py-0.5 rounded bg-muted text-xs font-mono">
              ```
            </kbd>{" "}
            then Enter to insert a code block
          </p>
          <p className="text-xs text-muted-foreground">
            {editor.storage.characterCount?.words?.() ?? 0} words
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}
