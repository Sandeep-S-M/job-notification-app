import { useCallback, useMemo, useState } from "react";
import { getSavedJobIds, toggleSavedJob } from "../lib/savedJobs";

export function useSavedJobs() {
  const [version, setVersion] = useState(0);

  const savedIds = useMemo(() => new Set(getSavedJobIds()), [version]);

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  const toggle = useCallback((id: string) => {
    toggleSavedJob(id);
    refresh();
  }, [refresh]);

  const saved = useCallback((id: string) => savedIds.has(id), [savedIds]);

  return { savedIds, toggle, saved, refresh };
}
