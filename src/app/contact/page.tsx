import { Breadcrumb, SkeletonCP } from '../../components';

const ContactPage = () => {
  return (
    <>
      <Breadcrumb pageName="Liên hệ" description="Liên hệ" />
      <div className="container">
        <div className="my-3">
          <SkeletonCP />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
