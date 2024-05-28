import { createContext, useContext, useState } from 'react';
import { DraftContextType, DraftType } from '../lib/types/types';
import { set } from '@project-serum/anchor/dist/cjs/utils/features';

const DraftContext = createContext<DraftContextType>({
  drafts: [],
  updateDrafts: (draft: DraftType) => {},
  updateInitDrafts: (drafts: DraftType[]) => {},
});

export const DraftContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [drafts, setDrafts] = useState<DraftType[]>([]);

  const updateInitDrafts = (drafts: DraftType[]) => {
    setDrafts(drafts);
    console.log('Line 24 - DraftContextProvider - updateInitDrafts', drafts);
  };

  const updateDrafts = (draft: DraftType) => {
    console.log('Line 24 - DraftContextProvider - updateDrafts', draft);
    setDrafts((currentDrafts) => {
      const draftIndex = currentDrafts.findIndex(
        (currDraft) => currDraft.id === draft.id
      );
      console.log(
        'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
      );
      console.log('draftIndex::', draftIndex);
      if (draftIndex !== -1) {
        // Draft exists, update it
        const updatedDrafts = [...currentDrafts];
        updatedDrafts[draftIndex] = {
          ...updatedDrafts[draftIndex],
          ...draft,
        };
        console.log('updatedDrafts::', updatedDrafts);
        return updatedDrafts;
      } else {
        // Draft does not exist, add new
        return [...currentDrafts, draft];
      }
    });
  };
  return (
    <DraftContext.Provider
      value={{
        drafts: drafts,
        updateDrafts: updateDrafts,
        updateInitDrafts: updateInitDrafts,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export const useDraftContext = () => {
  const context = useContext(DraftContext);
  if (context === undefined) {
    throw new Error(
      'useDraftContext must be used within a DraftContextProvider'
    );
  }
  return context;
};
