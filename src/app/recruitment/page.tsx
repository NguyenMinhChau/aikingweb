import { Breadcrumb, SkeletonCP } from '../../components';

const RecruitmentPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tuyển dụng" description="Tuyển dụng" />
      <div className="container">
        <div className="my-3">
          <SkeletonCP />
        </div>
      </div>
    </>
  );
};

export default RecruitmentPage;
