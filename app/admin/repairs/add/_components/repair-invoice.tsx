'use client';
import dayjs from 'dayjs';
import React, { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { DATE_FORMAT } from '@/src/constants/constant';
import { formatVND } from '@/src/constants/utils';
import { RepairEntity, RepairM2MProductEntity, RepairM2MServiceEntity } from '@/src/graphql/type.interface';

type Props = {
  repair?: RepairEntity;
};

const Invoice = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { repair } = props;

  const products = useMemo(() => repair?.products ?? [], [repair?.products]);

  const totalPriceOfProducts = useMemo(
    () => products.reduce((sum, p) => (sum += p.price * p.quantity), 0) ?? 0,
    [products],
  );

  const services = useMemo(() => repair?.services ?? [], [repair?.services]);

  const totalPriceOfServices = useMemo(() => services.reduce((sum, s) => (sum += s.price), 0) ?? 0, [services]);

  const discount = useMemo(
    () => ((totalPriceOfProducts + totalPriceOfServices) * (repair?.discount_percent ?? 0)) / 100,
    [totalPriceOfProducts, repair?.discount_percent, totalPriceOfServices],
  );

  return (
    <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial', width: '700px' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>HÓA ĐƠN SỬA CHỮA XE MÁY</h2>
      <p>
        <strong>Tên khách hàng:</strong> {repair?.name}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {repair?.phone}
      </p>
      <p>
        <strong>Hãng xe:</strong> {repair?.model?.brand?.name}
      </p>
      <p>
        <strong>Loại xe:</strong> {repair?.model?.name}
      </p>
      <p>
        <strong>Biển số:</strong> {repair?.license_plate}
      </p>
      <p>
        <strong>Thời gian:</strong> {dayjs().format(DATE_FORMAT.dateTime)}
      </p>
      <p>
        <strong>Phụ tùng và dịch vụ:</strong>
      </p>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid black',
        }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid black' }}>Tên</th>
            <th style={{ padding: '8px', border: '1px solid black' }}>Số lượng</th>
            <th style={{ padding: '8px', border: '1px solid black' }}>Đơn giá (VND)</th>
            <th style={{ padding: '8px', border: '1px solid black' }}>Thành tiền (VND)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((part: RepairM2MProductEntity) => (
            <tr key={part.id}>
              <td style={{ padding: '8px', border: '1px solid black' }}>{part.product.name}</td>
              <td style={{ padding: '8px', textAlign: 'center', border: '1px solid black' }}>{part.quantity}</td>
              <td style={{ padding: '8px', textAlign: 'right', border: '1px solid black' }}>
                {formatVND(part.price, true)}
              </td>
              <td style={{ padding: '8px', textAlign: 'right', border: '1px solid black' }}>
                {formatVND(part.price * part.quantity, true)}
              </td>
            </tr>
          ))}
          {services.map((part: RepairM2MServiceEntity) => (
            <tr key={part.id}>
              <td style={{ padding: '8px', border: '1px solid black' }}>{part.service.name}</td>
              <td style={{ padding: '8px', textAlign: 'center', border: '1px solid black' }}>1</td>
              <td style={{ padding: '8px', textAlign: 'right', border: '1px solid black' }}>
                {formatVND(part.price, true)}
              </td>
              <td style={{ padding: '8px', textAlign: 'right', border: '1px solid black' }}>
                {formatVND(part.price, true)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ textAlign: 'right', marginTop: '20px' }}>
        <span style={{ display: 'inline-block', width: '150px', textAlign: 'left' }}>
          <strong>Tiền công:</strong>
        </span>
        <span style={{ display: 'inline-block', minWidth: '150px' }}>{formatVND(totalPriceOfServices, true)}</span>
      </p>
      <p style={{ textAlign: 'right' }}>
        <span style={{ display: 'inline-block', width: '150px', textAlign: 'left' }}>
          <strong>Tiền phụ tùng:</strong>
        </span>
        <span style={{ display: 'inline-block', minWidth: '150px' }}>{formatVND(totalPriceOfProducts, true)}</span>
      </p>
      <p style={{ textAlign: 'right' }}>
        <span style={{ display: 'inline-block', width: '150px', textAlign: 'left' }}>
          <strong>Thuế:</strong>
        </span>

        <span style={{ display: 'inline-block', minWidth: '150px' }}>10%</span>
      </p>
      <p style={{ textAlign: 'right' }}>
        <span style={{ display: 'inline-block', width: '150px', textAlign: 'left' }}>
          <strong>Giảm giá:</strong>
        </span>
        <span style={{ display: 'inline-block', minWidth: '150px' }}>{formatVND(discount ?? 0, true)}</span>
      </p>
      <p style={{ textAlign: 'right' }}>
        <span style={{ display: 'inline-block', width: '150px', textAlign: 'left' }}>
          <strong>Tổng cộng:</strong>
        </span>
        <span style={{ display: 'inline-block', minWidth: '150px' }}>{formatVND(repair?.total ?? 0, true)}</span>
      </p>

      <div style={{ marginTop: '60px', textAlign: 'right' }}>
        <p>
          <em>
            <strong>Người sửa chữa</strong>
          </em>
        </p>
      </div>
    </div>
  );
});

Invoice.displayName = 'Invoice';

export const RepairInvoice = ({ repair }: Props) => {
  const componentRef = useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'AwesomeFileName',
  });

  return (
    <div className='p-5 bg-[#F9F9F9]'>
      <div className='p-5 bg-white flex justify-between'>
        <Invoice ref={componentRef} repair={repair} />
        <Button onClick={() => printFn()}>In hóa đơn</Button>
      </div>
    </div>
  );
};
