import { getPhase, getGamesByPhaseId } from '@gochamps/api-client';
import { Card } from '@gochamps/ui';

interface PhasePageParams {
  locale: string;
  org: string;
  tournament: string;
  phaseId: string;
}

export default async function PhasePage({
  params
}: {
  params: Promise<PhasePageParams>;
}) {
  const { phaseId } = await params;
  const [phase, games] = await Promise.all([
    getPhase(phaseId),
    getGamesByPhaseId(phaseId)
  ]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold">{phase.title}</h1>
      <div className="mt-6 space-y-4">
        {games.map(game => (
          <Card key={game.id}>
            <div className="flex items-center justify-between">
              <span>{game.homeTeam.name}</span>
              <span>
                {game.homeScore} - {game.awayScore}
              </span>
              <span>{game.awayTeam.name}</span>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
