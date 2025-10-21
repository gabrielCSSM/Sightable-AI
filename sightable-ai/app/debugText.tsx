export default function DebugText({PageTitle}: {PageTitle: String}) {
  return (
      <p className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        Debug!: THIS IS THE {PageTitle} PAGE
      </p>
  );
}