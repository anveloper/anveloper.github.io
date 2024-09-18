export const generateStaticParams = async () => {
  return [{ title: "test" }];
};

const getPostDetail = async (title: string) => {
  if (!title) return { post: null, error: "제목을 입력해주세요." };
  return { post: title, error: "" };
};

const PostPage = async ({ params: { title } }: { params: { title: string } }) => {
  const { post, error } = await getPostDetail(title);
  return <div>{post}</div>;
};

export default PostPage;
