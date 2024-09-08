
using UnityEngine;
using TMPro;

public class PistolBullet : MonoBehaviour
{
    //Gun stats
    public int damage;

    //Reference
    public Camera fpsCam;
    public Transform attackPoint;
    public RaycastHit rayHit;
    public LayerMask whatIsEnemy;
    public Zombie zombie;

    void Start() {
        zombie = GameObject.FindGameObjectWithTag("Enemy").GetComponent<Zombie>();
        damage = 20;
    }

    
    private void Update()
    {
      
    }

    private void OnCollisionEnter(Collision collision)
    {
        // Check if the collision is with the zombie
        if (collision.gameObject.CompareTag("Enemy"))
        {
            // Assuming the Zombie script has a TakeDamage method
            zombie.TakeDamage(damage);

            // Destroy the bullet after it hits the zombie
            Destroy(gameObject);
        }
    }
   
}
