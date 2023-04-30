import { Breadcrumb, SkeletonCP } from '../../../components';

const WebPage = () => {
  return (
    <>
      <Breadcrumb pageName="Web" description="Web" />
      <div className="container">
        <div className="my-3">
          <SkeletonCP />
        </div>
      </div>
    </>
  );
};

export default WebPage;
