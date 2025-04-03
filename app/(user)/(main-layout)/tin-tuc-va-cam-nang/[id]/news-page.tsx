'use client';
import { $generateHtmlFromNodes } from '@lexical/html';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { createEditor } from 'lexical';
import { useEffect, useState } from 'react';
import PlaygroundNodes from '@/components/lexical-editor/nodes/PlaygroundNodes';
import { NewsEntity } from '@/src/graphql/type.interface';
import { ClockIcon } from '../_components/clock-icon';

export interface IntroTabProps {
  news: NewsEntity;
}

export const NewsPage = ({ news }: IntroTabProps) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  useEffect(() => {
    const content = news.content;

    if (content) {
      const editor = createEditor({
        nodes: [...PlaygroundNodes],
      });

      try {
        const jsonString = typeof content === 'string' ? content : JSON.stringify(content);
        const parsedState = editor.parseEditorState(jsonString);
        editor.setEditorState(parsedState);

        editor.update(() => {
          const html = $generateHtmlFromNodes(editor);
          setHtmlContent(html);
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);
        setHtmlContent('<p>Error loading content</p>');
      }
    }
  }, [news.content]);

  return (
    <div>
      <div className='w-[160px] h-6 flex gap-x-[6px] items-center justify-center bg-[#E6F1FF] rounded-[3px] mb-[10px]'>
        <ClockIcon />
        <span className='text-sm text-secondary-default font-medium'>
          {dayjs(news.createdAt).format('HH:mm DD/MM/YYYY')}
        </span>
      </div>
      <h1 className='text-2xl font-semibold lg:text-[40px] lg:leading-[48px] text-[#121212] mb-12 mt-0'>
        {news?.title}
      </h1>
      {parse(htmlContent)}
    </div>
  );
};
