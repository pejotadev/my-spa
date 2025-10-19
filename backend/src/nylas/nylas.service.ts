import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class NylasService {
  private readonly logger = new Logger(NylasService.name);
  private readonly httpClient: AxiosInstance;
  private readonly baseUrl = 'https://api.us.nylas.com';
  private readonly apiKey = 'nyk_v0_g8uBlVOoLDEORzriZ7lKNQRrmTTEyLWiajeHcw62nY87ZIfuNLV2AiRkZagSaGxL';
  private readonly grantId = '496dd5ae-ed2e-46ce-9735-acbe543fdadd';

  constructor() {
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  // Configuration Management
  async getConfigurations() {
    try {
      const response = await this.httpClient.get(`/v3/grants/${this.grantId}/scheduling/configurations`);
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching configurations:', error.response?.data || error.message);
      throw error;
    }
  }

  async getConfiguration(configurationId: string) {
    try {
      const response = await this.httpClient.get(`/v3/grants/${this.grantId}/scheduling/configurations/${configurationId}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching configuration:', error.response?.data || error.message);
      throw error;
    }
  }

  async createConfiguration(configurationData: any) {
    try {
      const response = await this.httpClient.post(`/v3/grants/${this.grantId}/scheduling/configurations`, configurationData);
      return response.data;
    } catch (error) {
      this.logger.error('Error creating configuration:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateConfiguration(configurationId: string, configurationData: any) {
    try {
      const response = await this.httpClient.put(`/v3/grants/${this.grantId}/scheduling/configurations/${configurationId}`, configurationData);
      return response.data;
    } catch (error) {
      this.logger.error('Error updating configuration:', error.response?.data || error.message);
      throw error;
    }
  }

  async deleteConfiguration(configurationId: string) {
    try {
      const response = await this.httpClient.delete(`/v3/grants/${this.grantId}/scheduling/configurations/${configurationId}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error deleting configuration:', error.response?.data || error.message);
      throw error;
    }
  }

  // Booking Management
  async getBookings(configurationId: string, limit = 20, pageToken?: string) {
    try {
      const params = new URLSearchParams({
        configuration_id: configurationId,
        limit: limit.toString(),
      });
      
      if (pageToken) {
        params.append('page_token', pageToken);
      }

      const response = await this.httpClient.get(`/v3/scheduling/bookings?${params.toString()}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching bookings:', error.response?.data || error.message);
      throw error;
    }
  }

  async getBooking(bookingId: string, configurationId: string) {
    try {
      const response = await this.httpClient.get(`/v3/scheduling/bookings/${bookingId}?configuration_id=${configurationId}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching booking:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateBooking(bookingId: string, configurationId: string, bookingData: any) {
    try {
      const response = await this.httpClient.put(`/v3/scheduling/bookings/${bookingId}?configuration_id=${configurationId}`, bookingData);
      return response.data;
    } catch (error) {
      this.logger.error('Error updating booking:', error.response?.data || error.message);
      throw error;
    }
  }

  async confirmBooking(bookingId: string, configurationId: string) {
    try {
      const response = await this.httpClient.post(`/v3/scheduling/bookings/${bookingId}/confirm?configuration_id=${configurationId}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error confirming booking:', error.response?.data || error.message);
      throw error;
    }
  }

  async cancelBooking(bookingId: string, configurationId: string) {
    try {
      const response = await this.httpClient.post(`/v3/scheduling/bookings/${bookingId}/cancel?configuration_id=${configurationId}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error canceling booking:', error.response?.data || error.message);
      throw error;
    }
  }

  async deleteBooking(bookingId: string, configurationId: string) {
    try {
      const response = await this.httpClient.delete(`/v3/scheduling/bookings/${bookingId}?configuration_id=${configurationId}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error deleting booking:', error.response?.data || error.message);
      throw error;
    }
  }

  // Availability Management
  async getAvailability(configurationId: string, startTime: string, endTime: string) {
    try {
      // Convert ISO strings to Unix timestamps
      const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);

      const params = new URLSearchParams({
        configuration_id: configurationId,
        start_time: startTimestamp.toString(),
        end_time: endTimestamp.toString(),
      });

      const response = await this.httpClient.get(`/v3/scheduling/availability?${params.toString()}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching availability:', error.response?.data || error.message);
      throw error;
    }
  }
}
