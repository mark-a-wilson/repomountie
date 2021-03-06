//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Jason Leach on 2020-03-10.
//

'use strict';

import { logger } from '@bcgov/common-nodejs-utils';
import mongoose from 'mongoose';
import config from '../config';
import ComplianceAudit from './compliance';
import RepoMeta from './repometa';

/**
 * Connect to mongo database
 */
export const connect = async () => {
    const options = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    const user = config.get('db:user');
    const passwd = config.get('db:password');
    const host = config.get('db:host');
    const dbname = config.get('db:database');
    const curl = `mongodb://${user}:${passwd}@${host}/${dbname}`;
    try {
        await mongoose.connect(curl, options);
    } catch (err) {
        const message = `Unable to connect to ${host}/${dbname}`;
        logger.error(`${message}, error = ${err.message}`);

        throw err;
    }
};

/**
 * Close connection to mongo database
 * The connection to mongo needs to be closed so the script
 * can exit.
 */
export const cleanup = () => {
    mongoose.connection.close();
};

export { ComplianceAudit, RepoMeta };

