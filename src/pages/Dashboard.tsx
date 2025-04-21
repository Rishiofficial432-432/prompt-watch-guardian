
const Dashboard = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-10">
    <h2 className="text-3xl font-bold mb-6">Truth Guard - Safety Dashboard</h2>
    <div className="w-full max-w-5xl">
      {/* Use the existing dashboard visualization component */}
      {/* This shows the same big dashboard previously below the main page */}
      {/* We import and use DashboardComponent here */}
      {/* As DashboardComponent expects a "data" prop, you may fetch real data or use mock for now. */}
      {/* To be extended with backend/saving later if desired */}
      {/* <DashboardComponent data={dashboardData} /> */}
      <p className="text-muted-foreground text-center">
        Your safety analysis dashboard summary will appear here.
      </p>
    </div>
  </div>
);

export default Dashboard;
