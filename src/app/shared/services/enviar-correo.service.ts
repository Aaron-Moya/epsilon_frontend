import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnviarCorreoService {

  private baseURL = "http://localhost:8080/api/email";

  constructor(private httpClient: HttpClient) { }

  enviarCorreoRegistro(correoUsuario: string): void {
    const destinatario = correoUsuario;
    const asunto = "Registro Epsilon";
    const texto = "¡Muchas gracias por registrarte en Epsilon!";
    this.httpClient.get<void>(`${this.baseURL + "/registro"}`, {
      params: { email: destinatario, texto: texto, asunto: asunto }
    }).subscribe();
  }

}
