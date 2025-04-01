'use client';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useExportRepairsLazyQuery } from '@/src/graphql/queries/exportRepairs.generated';
import { downloadExcel } from '@/src/utils/download-excel.util';

type Props = {
  startDate: string;
  endDate: string;
};

export const ExportExcelRepairs = ({ endDate, startDate }: Props) => {
  const [exportRepairs, { loading }] = useExportRepairsLazyQuery({
    onCompleted(data) {
      if (data?.exportRepairs) {
        downloadExcel(data?.exportRepairs, 'Doanh thu');
      }
    },
    onError(error) {
      toast.error('Xuất file thất bại!', {
        description: error.message,
      });
    },
  });

  return (
    <Button
      loading={loading}
      onClick={() =>
        exportRepairs({
          variables: {
            input: {
              startDate,
              endDate,
            },
          },
        })
      }
      size={'md'}>
      Xuất file <Download />
    </Button>
  );
};
