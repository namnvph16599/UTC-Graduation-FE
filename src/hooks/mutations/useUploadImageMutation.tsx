import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiInstance } from '@/src/configs/axios';

export type UseUploadImageMutationVariable = { file: File };
export type UseUploadImageMutationResponse = { url: string };
export type UseUploadImageMutationErrorResponse = { message: string };
export type UseUploadImageMutationOptions = UseMutationOptions<
  UseUploadImageMutationResponse,
  AxiosError<UseUploadImageMutationErrorResponse>,
  UseUploadImageMutationVariable
>;

export function useUploadFileMutation(options: UseUploadImageMutationOptions) {
  return useMutation({
    mutationFn: (values) => {
      const formData = new FormData();
      formData.append('file', values.file);

      return apiInstance.post('/media/upload-image', formData).then((res) => res.data);
    },
    ...options,
  });
}
