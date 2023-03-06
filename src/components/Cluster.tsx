type ClusterProps = {
  children: React.ReactNode;
  gap?: string;
  props?: React.ReactNode;
};
export default function Cluster({ children, gap, ...props }: ClusterProps) {
  const INTERNAL_CLASS = "cluster";
  return (
    <>
      <div
        className={INTERNAL_CLASS}
        style={{
          gap: gap ? "0" : gap,
          width: "100",
        }}
      >
        {children}
      </div>
    </>
  );
}
