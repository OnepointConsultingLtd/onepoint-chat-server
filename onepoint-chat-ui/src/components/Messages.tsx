import Flow from './flow/Flow';

export default function Messages() {
  return (
    <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 10rem)' }}>
      <Flow />
    </div>
  );
}
