import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent } from '@/components/ui/Card';

interface RequirementsProps {
  minRequirements: Array<{ key: string; value: string }>;
  recRequirements: Array<{ key: string; value: string }>;
}

export function Requirements({
  minRequirements,
  recRequirements,
}: RequirementsProps) {
  if (minRequirements.length === 0 && recRequirements.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-semibold">System Requirements</h2>

      {/* Mobile Tabs */}
      <div className="sm:hidden">
        <Tabs defaultValue="minimum" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="minimum">Minimum</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
          <TabsContent value="minimum">
            <Card>
              <CardContent className="pt-6">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {minRequirements.map((req, index) => (
                    <div key={index}>
                      <dt className="font-medium">{req.key}</dt>
                      <dd className="text-muted-foreground">{req.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recommended">
            <Card>
              <CardContent className="pt-6">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {recRequirements.map((req, index) => (
                    <div key={index}>
                      <dt className="font-medium">{req.key}</dt>
                      <dd className="text-muted-foreground">{req.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 gap-6">
        {minRequirements.length > 0 && (
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Minimum Requirements
                </h3>
                {minRequirements.length > 0 ? (
                  <dl className="grid grid-cols-1 gap-4">
                    {minRequirements.map((req, index) => (
                      <div key={index}>
                        <dt className="font-medium">{req.key}</dt>
                        <dd className="text-muted-foreground">{req.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-gray-500">Not specified</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {recRequirements.length > 0 && (
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Recommended Requirements
                </h3>
                {recRequirements.length > 0 ? (
                  <dl className="grid grid-cols-1 gap-4">
                    {recRequirements.map((req, index) => (
                      <div key={index}>
                        <dt className="font-medium">{req.key}</dt>
                        <dd className="text-muted-foreground">{req.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-gray-500">Not specified</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
