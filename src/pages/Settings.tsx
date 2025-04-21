import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Settings = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-10">
    <Card className="glass w-full max-w-xl">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your Truth Guard system preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-bold mb-4">Custom Test Cases</h2>
        <div className="p-4 bg-accent/10 rounded-lg mb-2">
          <p className="text-muted-foreground mb-2">
            Manage your custom test cases here. This section will allow you to add, edit, and delete test cases to automate prompt analysis and testing soon.
          </p>
          {/* Placeholder: Future management UI (add/edit/remove test cases) */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-full">
              <input
                type="text"
                className="w-full px-3 py-2 rounded border border-border/60 bg-background placeholder:text-muted-foreground"
                placeholder="New test case (coming soon)"
                disabled
              />
            </div>
            <button disabled className="inline-flex items-center px-4 py-2 rounded bg-primary text-primary-foreground opacity-70 cursor-not-allowed">
              Add
            </button>
          </div>
        </div>
        {/* Other settings can be added below */}
      </CardContent>
    </Card>
  </div>
);

export default Settings;
