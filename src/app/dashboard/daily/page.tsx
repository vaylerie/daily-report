import DailyReportForm from "@/components/forms/DailyForm"

export default function DailyPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Daily</h1>
      <p className="mt-2 text-gray-600">Fill your daily reports below.</p>
      <div className="py-8">
        <DailyReportForm/>
      </div>

    </div>
  )
}

