// src/app/admin/users/edit/[id]/page.tsx

import EditUserPage from "../../../../../components/EditUserPage";

const AdminEditUserPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <EditUserPage userId={id} />;
};

export default AdminEditUserPage;
