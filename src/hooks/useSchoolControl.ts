import { useContext } from 'react';

import { SchoolControlContext } from '../contexts/SchoolControlProvider';

export const useSchoolControl = () => useContext(SchoolControlContext);
