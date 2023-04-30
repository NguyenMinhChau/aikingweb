import { Breadcrumb, SkeletonCP } from '../../../components';

const FinanceReportPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Báo cáo tài chính"
        description="Báo cáo tài chính"
      />
      <div className="container">
        <div className="my-3">
          <SkeletonCP />
        </div>
      </div>
    </>
  );
};

export default FinanceReportPage;
