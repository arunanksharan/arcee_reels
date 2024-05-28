import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../../lib/supabase';
import ProfileNavbar from '../../components/profile/navbar/ProfileNavbar';
import ProfileHeader from '../../components/profile/header/ProfileHeader';

// https://randomuser.me/api
const randomUserResult = {
  results: [
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Siril',
        last: 'Wright',
      },
      location: {
        street: {
          number: 8824,
          name: 'Lindealléen',
        },
        city: 'Brunstad',
        state: 'Troms - Romsa',
        country: 'Norway',
        postcode: '2839',
        coordinates: {
          latitude: '40.2354',
          longitude: '23.7829',
        },
        timezone: {
          offset: '+5:30',
          description: 'Bombay, Calcutta, Madras, New Delhi',
        },
      },
      email: 'siril.wright@example.com',
      login: {
        uuid: 'dfebe81d-0cc3-4d47-b14f-be4332d0b186',
        username: 'yellowpanda930',
        password: 'darlene',
        salt: 'UXn2rCSe',
        md5: '317dab1367d4eff178bde1adaada3b66',
        sha1: '9b027c27f442785e2f6c051df2b5acf598109ffd',
        sha256:
          '29cc81d9a064a09b5ccd53aaae2ae187fbcfe652badded4f8cf8d0a91171c5b9',
      },
      dob: {
        date: '1961-02-25T19:23:24.789Z',
        age: 63,
      },
      registered: {
        date: '2006-03-22T18:32:17.422Z',
        age: 18,
      },
      phone: '28070548',
      cell: '92254992',
      id: {
        name: 'FN',
        value: '25026108031',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/20.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/20.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/20.jpg',
      },
      nat: 'NO',
    },
  ],
  info: {
    seed: 'ad7f4f88e7936b53',
    results: 1,
    page: 1,
    version: '1.4',
  },
};

const currentUser = randomUserResult.results[0];

const ProfileScreen = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // console.log('supabase.auth', supabase.auth);
    console.log('session', session);

    // Todo: Extract user from session | fetch all user details from db | show as profile
  }, []);

  return (
    <View style={styles.container}>
      <ProfileNavbar user={currentUser} />
      <ProfileHeader user={currentUser} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
});
