'use client';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldValues } from 'react-hook-form';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { REGEX } from '@/src/constants/regex';

type Props = {
  title?: string;
  error?: string;
  field: FieldValues;
  width?: number;
  height?: number;
};

export const UploadImage = ({ title, error, field, width = 400, height = 400 }: Props) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>('');

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        field.onChange(acceptedFiles[0]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error);
        setPreview(null);
        field.onChange('');
      }
    },
    [field],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1000000,
    accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
  });

  useEffect(() => {
    if (field.value && REGEX.imageAddress.test(field.value) && !preview) {
      setPreview(field.value);
    }
  }, [field.value, preview]);

  return (
    <>
      <FormLabel className={`${fileRejections.length !== 0 && 'text-destructive'}`}>
        {title ?? 'Tải ảnh lên'}
        <span className={error || fileRejections.length !== 0 ? 'text-destructive' : 'text-muted-foreground'} />
      </FormLabel>
      <FormControl>
        <div
          {...getRootProps()}
          className='mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-input p-3'>
          {preview && <Image alt='Uploaded image' height={height} src={preview as string} width={width} />}
          <ImagePlus className={`my-10 size-10 ${preview ? 'hidden' : 'block'}`} color='#0a0a0a' />
          <Input {...getInputProps()} type='file' />
          {isDragActive ? (
            <p className='text-[#0a0a0a] text-sm'>Thả ảnh tại đây</p>
          ) : (
            <p className='text-[#0a0a0a] text-sm'>Ấn vào hoặc kéo ảnh để tải lên</p>
          )}
        </div>
      </FormControl>
      <FormMessage>
        {fileRejections.length !== 0 && <p>Kích thước tệp của ảnh phải nhỏ hơn 1MB (định dạng png, jpg, or jpeg)</p>}
      </FormMessage>
    </>
  );
};
